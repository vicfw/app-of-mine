import { useEffect, useState } from 'react';
import { CategoryType } from '../../types/category';

export const useCategoriesPage = () => {
  const [tableData, setTableData] = useState<
    | {
        id: string;
        name: string;
        image: string;
        isSelected: boolean;
        createdAt: Date;
      }[]
    | []
  >([]);

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [totalAds, setTotalAds] = useState(0);

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
      setTotalAds(result.total);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    val: { tableData },
    set: { setTableData },
  };
};
