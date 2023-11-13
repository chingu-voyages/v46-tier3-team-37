import Button from '@/components/uiComponents/Button';
import { useState } from 'react';

export default function RemoveButton({
  id,
  handleRemove,
}: {
  id: string;
  handleRemove: (id: string) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Button onClick={() => setShowConfirm(true)}>
        Remove
      </Button>
      {showConfirm && (
        <div>
          <p>Are you sure you want to remove this item?</p>
          <Button onClick={() => handleRemove(id)}>
            Confirm
          </Button>
          <Button onClick={handleCancelRemove}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
