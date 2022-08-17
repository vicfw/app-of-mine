import type { NextApiRequest } from 'next';
import mime from 'mime';
import { join } from 'path';
import * as dateFn from 'date-fns';
import formidable from 'formidable';
import { mkdir, stat } from 'fs/promises';

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/`
    );

    console.log(uploadDir, 'uploadDir');

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    let filename = ''; //  To avoid duplicate upload
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        if (filename !== '') {
          return filename;
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        filename = `${part.name || 'unknown'}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || '') || 'unknown'
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === 'media' && (part.mimetype?.includes('image') || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      console.log(err, 'in err');

      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
