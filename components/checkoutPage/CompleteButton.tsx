import Button from '@/components/uiComponents/Button';
import { useState } from 'react';

export default function CompleteButton({
  id,
  handleComplete,
}: {
  id: string;
  handleComplete: (id: string) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Button onClick={() => setShowConfirm(true)}>
        Complete
      </Button>
      {showConfirm && (
        <div>
          <p>
            Are you sure you want to complete this item?
          </p>
          <Button onClick={() => handleComplete(id)}>
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
