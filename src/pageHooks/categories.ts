import { ChangeEvent, useEffect, useState } from 'react';
import { CategoryType } from '../../types/category';

interface tableDataType {
  id: string;
  name: string;
  image: string;
  isSelected: boolean;
  createdAt: Date;
}

interface EditStateType {
  id: string;
  image: string;
  name: string;
}

export const useCategoriesPage = () => {
  const [tableData, setTableData] = useState<tableDataType[] | []>([]);

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [totalCategories, setTotalCategories] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorState, setErrorState] = useState({ name: '', image: '' });

  const [editState, setEditState] = useState<EditStateType>({
    id: '',
    name: '',
    image: '',
  });

  console.log(editState, 'editState');

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const onClickEditButton = (id: string) => {
    const searchForCategory = tableData.filter((table) => table.id === id)[0];

    console.log(searchForCategory, 'searchForCategory');

    setEditState({
      id: searchForCategory.id,
      name: searchForCategory.name,
      image: searchForCategory.image,
    });

    setOpenEditModal(true);
  };

  const fetchCategories = async () => {
    const res = await fetch(
      `/api/admin/categories?skip=${pagination.skip}&limit=${pagination.limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const result: { success: boolean; data: CategoryType[]; total: number } =
      await res.json();

    if (result.success) {
      const mappedCategories = result.data.map((category) => {
        return {
          id: category._id,
          name: category.name,
          isSelected: false,
          image: category.image,
          createdAt: new Date(category.createdAt),
        };
      });

      setTableData((perv) => [...perv, ...mappedCategories]);
      setTotalCategories(result.total);
    }
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
      previewUrl
    ) {
      e.target.type = 'text';
      e.target.type = 'file';
      return;
    }

    const file = fileInput.files[0];

    const fileSizeInMegaBytes = file.size / 1024 ** 2;

    if (fileSizeInMegaBytes > 1) {
      return;
    }

    let formData = new FormData();
    formData.append('media', file);

    /** File validation */
    if (!file.type.startsWith('image')) {
      e.target.type = 'text';
      e.target.type = 'file';
      return;
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const {
      data,
      error,
    }: {
      data: {
        url: string;
      } | null;
      error: string | null;
    } = await res.json();

    /** Setting file state */

    if (data?.url) {
      setEditState((perv) => ({ ...perv, image: data.url }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('something went wrong');
    }

    /** Reset file input */
    e.target.type = 'text';
    e.target.type = 'file';
  };

  const editHandler = async () => {
    if (!editState.name) {
      setErrorState((perv) => ({ ...perv, name: 'please provide a name' }));

      return;
    }

    if (!editState.image) {
      setErrorState((perv) => ({ ...perv, image: 'please provide an image' }));
      return;
    }

    const res = await fetch(`/api/category/${editState.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ image: editState.image, name: editState.name }),
    });

    const result = await res.json();

    if (result.success) {
      setOpenEditModal(false);
      setTableData((perv) => {
        return perv.map((p) => {
          if (p.id === editState.id) {
            p.name = editState.name;
            p.image = editState.image;
          }
          return p;
        });
      });
    }
  };

  const createHandler = async () => {
    if (!editState.name) {
      setErrorState((perv) => ({ ...perv, name: 'please provide a name' }));

      return;
    }

    if (!editState.image) {
      setErrorState((perv) => ({ ...perv, image: 'please provide an image' }));
      return;
    }

    const res = await fetch(`/api/category`, {
      method: 'POST',
      body: JSON.stringify({ image: editState.image, name: editState.name }),
    });

    const result = await res.json();

    console.log(result);

    if (result.success) {
      setOpenCreateModal(false);
      result.data.createdAt = new Date(result.data.createdAt);
      setTableData((perv) => [result.data, ...perv]);
    } else {
      alert('something went wrong,try again later');
    }
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/category/${editState.id}`, {
      method: 'DELETE',
    });

    const result = await res.json();

    if (result.success) {
      setTableData((perv) => {
        return perv.filter((p) => p.id !== editState.id);
      });
      setDeleteModalState(false);
    } else {
      alert('something went wrong,try later');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    val: {
      tableData,
      totalCategories,
      openEditModal,
      editState,
      errorState,
      deleteModalState,
      openCreateModal,
    },
    set: {
      setTableData,
      setPagination,
      setOpenEditModal,
      setEditState,
      setErrorState,
      setDeleteModalState,
      setOpenCreateModal,
    },
    on: {
      onFileUploadChange,
      editHandler,
      deleteHandler,
      onClickEditButton,
      createHandler,
    },
  };
};
