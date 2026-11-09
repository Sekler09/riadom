import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@repo/ui/components/dialog';

type UnsavedChangesDialogProps = {
  open: boolean;
  onKeepEditing: () => void;
  onDiscard: () => void;
};

const UnsavedChangesDialog = ({
  open,
  onKeepEditing,
  onDiscard,
}: UnsavedChangesDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          onKeepEditing();
        }
      }}
    >
      <DialogContent>
        <DialogTitle>discard changes?</DialogTitle>
        <DialogDescription>
          you have unsaved edits. leaving now will throw them away.
        </DialogDescription>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={onDiscard}>
            discard changes
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={onKeepEditing}
          >
            keep editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { UnsavedChangesDialog };
