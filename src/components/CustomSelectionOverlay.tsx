import { useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

interface CustomSelectionOverlayProps {
  maxRows: number;
  onSelect: (count: number) => void;
}

const CustomSelectionOverlay = ({
  maxRows,
  onSelect,
}: CustomSelectionOverlayProps) => {
  const [rowCount, setRowCount] = useState<number | null>(null);
  const overlayRef = useRef<OverlayPanel>(null);

  const handleSubmit = () => {
    if (rowCount && rowCount > 0) {
      onSelect(Math.min(rowCount, maxRows));
      overlayRef.current?.hide();
      setRowCount(null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => overlayRef.current?.toggle(e)}
        className="ml-1 text-gray-500 hover:text-gray-700"
        aria-label="Custom selection"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <OverlayPanel ref={overlayRef} className="w-72">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Rows
          </h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Enter number of rows to select (max: {maxRows})
            </label>
            <InputNumber
              value={rowCount}
              onValueChange={(e) => setRowCount(e.value ?? null)}
              min={1}
              max={maxRows}
              placeholder="Enter number"
              className="w-full"
            />
          </div>
          <Button
            label="Submit"
            onClick={handleSubmit}
            disabled={!rowCount || rowCount < 1}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer"
          />
        </div>
      </OverlayPanel>
    </>
  );
};

export default CustomSelectionOverlay;
