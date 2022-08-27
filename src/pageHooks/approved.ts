import { useEffect, useState } from "react";
import { AdsType } from "../../types/ad";

export const useApprovedPage = () => {
  const [tableData, setTableData] = useState<
    | {
        id: string;
        title: string;
        isSelected: boolean;
        isPop: boolean;
        createdAt: Date;
      }[]
    | []
  >([]);

  console.log(tableData);

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [totalAds, setTotalAds] = useState(0);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const fetchAds = async () => {
    const res = await fetch(
      `/api/admin/approved?skip=${pagination.skip}&limit=${pagination.limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result: { success: boolean; data: AdsType[]; total: number } =
      await res.json();

    console.log(result, "result in fetchAds");

    if (result.success) {
      const mappedAds = result.data.map((ad) => {
        return {
          id: ad._id,
          title: ad.title,
          isSelected: false,
          createdAt: new Date(ad.createdAt),
          isPop: ad.isPopular,
        };
      });

      setTableData((perv) => [...perv, ...mappedAds]);
      setTotalAds(result.total);
    }
  };

  const changePopularity = async (id: string, body: { isPopular: boolean }) => {
    const res = await fetch(`/api/ad/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    console.log(result);

    if (result.success) {
      setTableData((perv) => {
        return perv.map((p) => {
          if (p.id === id) {
            console.log("here");

            p.isPop = !p.isPop;
          }
          return p;
        });
      });
    } else {
      alert("something went wrong");
    }
  };

  const deleteAds = async () => {
    const body = tableData.filter((dt) => dt.isSelected).map((bd) => bd.id);

    const res = await fetch("/api/admin/approved", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result: { success: boolean } = await res.json();

    if (result.success) {
      setTableData((perv) => {
        return perv.filter((p) => !p.isSelected);
      });
      setDeleteModalState(false);
    }
  };

  const canDelete = () => {
    const canDelete = tableData.some((dt) => dt.isSelected);
    return canDelete;
  };

  useEffect(() => {
    fetchAds();
  }, [pagination]);

  return {
    val: { tableData, deleteModalState, totalAds },
    set: { setTableData, setDeleteModalState, setPagination },
    on: { deleteAds, canDelete, changePopularity },
  };
};
