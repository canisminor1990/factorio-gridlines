const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const FormData = require('form-data');
const { rootDir } = require('./const');

const MOD_PORTAL_URL = 'https://mods.factorio.com';
const INIT_UPLOAD_URL = `${MOD_PORTAL_URL}/api/v2/mods/releases/init_upload`;
const { consola } = require('consola');

const info = require('../public/info.json');

const archiveFile = path.resolve(rootDir, `${info.name}_${info.version}.zip`);
const modname = info.name;

function httpsRequest(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { headers, method }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ body: data, statusCode: res.statusCode });
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function upload() {
  try {
    // 初始化上传
    const initUploadRes = await httpsRequest(
      INIT_UPLOAD_URL,
      'POST',
      {
        'Authorization': `Bearer ${process.env.FACTORIO_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      `mod=${modname}`,
    );

    const { upload_url } = JSON.parse(initUploadRes.body);
    consola.info('Upload URL:', upload_url);

    // 准备上传文件
    const form = new FormData();
    form.append('file', fs.createReadStream(archiveFile));

    // 上传文件
    return new Promise((resolve, reject) => {
      const req = https.request(
        upload_url,
        {
          headers: form.getHeaders(),
          method: 'POST',
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            if (res.statusCode === 200) {
              consola.success('File uploaded successfully');
              resolve();
            } else {
              reject(new Error(`Failed to upload file: ${data}`));
            }
          });
        },
      );

      req.on('error', reject);
      form.pipe(req);
    });
  } catch (error) {
    consola.error('Upload failed:', error.message);
    throw new Error(error);
  }
}

upload();
