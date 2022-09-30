import { useS3Upload } from 'next-s3-upload';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';

export const useCreateAdvertising = () => {
  let { uploadToS3 } = useS3Upload();

  const createAdInitialState: {
    title: string;
    category: string;
    phone: string;
    description: string;
    images: { img: string }[];
    city: string;
    organization: string;
  } = {
    title: '',
    category: 'select',
    phone: '',
    description: '',
    images: [],
    city: 'select',
    organization: 'person',
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [createAd, setCreateAd] = useState(createAdInitialState);
  const [loading, setLoading] = useState<boolean[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [errorString, setErrorString] = useState({
    title: '',
    category: '',
    phone: '',
    description: '',
    images: '',
    city: '',
    fail: '',
  });

  const onChangeInputs = (e: any) => {
    setCreateAd((perv) => ({ ...perv, [e.target.name]: e.target.value }));
    setErrorString((perv) => ({ ...perv, [e.target.name]: '' }));
  };

  const onFileUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      return;
    }

    if (
      !fileInput.files ||
      fileInput.files.length === 0 ||
      fileInput.files.length > 1 ||
      previewUrls.length === 3
    ) {
      setErrorString((perv) => ({
        ...perv,
        images: 'you cant upload more than 3 pictures for you Ad',
      }));
      e.target.type = 'text';
      e.target.type = 'file';
      return;
    }

    const file = fileInput.files[0];

    const fileSizeInMegaBytes = file.size / 1024 ** 2;

    if (fileSizeInMegaBytes > 1) {
      setErrorString((perv) => ({
        ...perv,
        images: 'use images less than 1 megabytes',
      }));
      e.target.type = 'text';
      e.target.type = 'file';
      return;
    }

    /** File validation */
    if (!file.type.startsWith('image')) {
      setErrorString((perv) => ({
        ...perv,
        images: 'please upload files with format of png or jpg',
      }));
      e.target.type = 'text';
      e.target.type = 'file';
      return;
    }

    if (previewUrls.length >= loading.length) {
      setLoading((perv) => {
        return [...perv, true];
      });
    } else {
      setLoading((perv) => {
        return perv.map((p, index) => {
          if (perv.length - 1 === index) {
            p = true;
          }
          return p;
        });
      });
    }

    try {
      let { url } = await uploadToS3(file);

      if (url) {
        setCreateAd((perv) => ({
          ...perv,
          images: [...perv.images, { img: url }],
        }));

        setErrorString((perv) => ({ ...perv, images: '' }));

        setPreviewUrls((perv) => {
          return [...perv, URL.createObjectURL(file)];
        });
        setLoading((perv) => {
          return perv.map((p) => false);
        });
      }
    } catch (e) {
      setToast(true);
      setErrorString((perv) => ({
        ...perv,
        fail: "Couldn't upload photo,Try again later",
      }));

      setLoading((perv) => {
        return perv.map((p) => false);
      });
    }

    /** Reset file input */
    e.target.type = 'text';
    e.target.type = 'file';
  };

  const errorHandler = () => {
    let errors: any = {};
    let value: keyof typeof createAd;
    for (value in createAd) {
      if (!createAd[value]) {
        errors[value] = `${value} of a ad cant be empty `;
      }

      if (createAd[value] === 'select') {
        errors[value] = `${value} of a ad cant be empty `;
      }

      if (typeof createAd[value] === 'object' && !createAd[value].length) {
        errors[value] = `${value} of a ad cant be empty `;
      }
    }

    setErrorString(errors as any);

    if (createAd.title.length < 4) {
      setErrorString((perv) => ({
        ...perv,
        title: 'title of a ad cant be less than 4 characters',
      }));
    }

    if (createAd.phone.length < 9) {
      setErrorString((perv) => ({
        ...perv,
        phone: 'phone of an ad should have more than 9 numbers',
      }));
    }
  };

  const createAdHandler = async () => {
    const values = Object.values(errorString);

    const haveError = values.some((err) => err);

    if (haveError) return;
    setSubmitLoading(true);
    const response = await fetch('/api/ad', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createAd),
    });

    const data = await response.json();

    if (data.success) {
      router.replace('/?created=y');
      setSubmitLoading(false);
    } else {
      setErrorString((perv) => ({ ...perv, fail: 'Something went wrong' }));
      setSubmitLoading(false);
    }
    inputRef.current!.type = 'text';
    inputRef.current!.type = 'file';
  };

  const clearTheForm = () => {
    setCreateAd({
      title: '',
      category: 'select',
      phone: '',
      description: '',
      images: [],
      city: 'select',
      organization: 'person',
    });
    setPreviewUrls([]);
  };

  return {
    get: {
      errorString,
      createAd,
      loading,
      inputRef,
      previewUrls,
      submitLoading,
      toast,
    },
    set: { setToast },
    on: {
      onChangeInputs,
      clearTheForm,
      onFileUploadChange,
      createAdHandler,
      errorHandler,
    },
  };
};
