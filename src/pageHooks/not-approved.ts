import { useState, useEffect } from 'react';
import { AdsType } from '../../types/ad';

export const useNotApprovedPage = () => {
  const [tableData, setTableData] = useState<
    | {
        id: string;
        title: string;
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
  const [approveModalState, setApproveModalState] = useState(false);

  const fetchAds = async () => {
    const res = await fetch(
      `/api/admin/not-approved?skip=${pagination.skip}&limit=${pagination.limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const result: { success: boolean; data: AdsType[]; total: number } =
      await res.json();

    if (result.success) {
      const mappedAds = result.data.map((ad) => {
        return {
          id: ad._id,
          title: ad.title,
          isSelected: false,
          createdAt: new Date(ad.createdAt),
        };
      });

      setTableData((perv) => [...perv, ...mappedAds]);
      setTotalAds(result.total);
    }
  };

  const updateAds = async () => {
    const body = tableData.filter((dt) => dt.isSelected).map((bd) => bd.id);

    const res = await fetch('/api/admin/not-approved?hello=farid', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result: { success: boolean; data: AdsType[] } = await res.json();

    if (result.success) {
      setTableData((perv) => {
        return perv.filter((p) => !p.isSelected);
      });
      setApproveModalState(false);
    }
  };

  const canUpdate = () => {
    const canUpdate = tableData.some((dt) => dt.isSelected);
    return canUpdate;
  };

  useEffect(() => {
    fetchAds();
  }, [pagination]);

  return {
    val: { tableData, totalAds, approveModalState },
    set: { setTableData, setPagination, setApproveModalState },
    on: { updateAds, canUpdate },
  };
};
