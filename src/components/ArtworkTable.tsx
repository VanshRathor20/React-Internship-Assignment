import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchArtworks } from "../api/artworkApi";
import type { Artwork } from "../types/Artwork";
import CustomSelectionOverlay from "./CustomSelectionOverlay";

const ArtworkTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handlePageChange = (event: DataTablePageEvent) => {
    setCurrentPage((event.page ?? 0) + 1);
  };

  const handleCustomSelect = (count: number) => {
    const idsToSelect = artworks.slice(0, count).map((a) => a.id);
    setSelectedIds(new Set(idsToSelect));
  };

  //   const toggleRowSelection = (id: number) => {
  //     setSelectedIds((prev) => {
  //       const newSet = new Set(prev);
  //       if (newSet.has(id)) {
  //         newSet.delete(id);
  //       }
  //        else {
  //         newSet.add(id);
  //       }
  //       return newSet;
  //     });
  //   };
  
  const toggleRowSelection = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === artworks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(artworks.map((a) => a.id)));
    }
  };

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const { artworks, total } = await fetchArtworks(currentPage);
        setArtworks(artworks);
        setTotalRecords(total);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, [currentPage]);

  const paginatorLeft = (
    <span className="text-gray-500 text-sm">
      Showing{" "}
      <span className="text-gray-900 font-semibold">
        {(currentPage - 1) * 12 + 1}
      </span>{" "}
      to{" "}
      <span className="text-gray-900 font-semibold">
        {Math.min(currentPage * 12, totalRecords)}
      </span>{" "}
      of <span className="text-gray-900 font-semibold">{totalRecords}</span>{" "}
      entries
    </span>
  );

  const allSelected =
    artworks.length > 0 && selectedIds.size === artworks.length;

  const selectionHeaderTemplate = () => {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleSelectAll}
          className="custom-checkbox"
        />
        <CustomSelectionOverlay
          maxRows={artworks.length}
          onSelect={handleCustomSelect}
        />
      </div>
    );
  };

  const selectionBodyTemplate = (rowData: Artwork) => {
    return (
      <input
        type="checkbox"
        checked={selectedIds.has(rowData.id)}
        onChange={() => toggleRowSelection(rowData.id)}
        className="custom-checkbox"
      />
    );
  };

  const rowClassName = (data: Artwork) => {
    return selectedIds.has(data.id) ? "bg-blue-50" : "";
  };

  const inscriptionsBodyTemplate = (rowData: Artwork) => {
    return rowData.inscriptions || "N/A";
  };

  return (
    <div className="m-4">
      <DataTable
        value={artworks}
        lazy
        paginator
        rows={12}
        totalRecords={totalRecords}
        onPage={handlePageChange}
        loading={loading}
        first={(currentPage - 1) * 12}
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        paginatorLeft={paginatorLeft}
        dataKey="id"
        rowClassName={rowClassName}
      >
        <Column
          header={selectionHeaderTemplate}
          body={selectionBodyTemplate}
          headerStyle={{ width: "4rem" }}
        />
        <Column field="title" header="TITLE" style={{ minWidth: "250px" }} />
        <Column
          field="place_of_origin"
          header="PLACE OF ORIGIN"
          style={{ minWidth: "120px" }}
        />
        <Column
          field="artist_display"
          header="ARTIST"
          style={{ minWidth: "200px" }}
        />
        <Column
          field="inscriptions"
          header="INSCRIPTIONS"
          body={inscriptionsBodyTemplate}
          style={{ minWidth: "200px" }}
        />
        <Column
          field="date_start"
          header="START DATE"
          style={{ width: "100px" }}
        />
        <Column field="date_end" header="END DATE" style={{ width: "100px" }} />
      </DataTable>
    </div>
  );
};

export default ArtworkTable;
