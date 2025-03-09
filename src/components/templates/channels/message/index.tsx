import { Button, Empty } from '@smartech/ui';

const Message = () => {
  return (
    <Empty useImage title="No working template is found.">
      <div className="flex items-center gap-2">
        <Button variant="secondary">Choose template</Button>
        <Button variant="primary" leading="icon" icons={{ start: 'plus' }}>
          Build template
        </Button>
      </div>
    </Empty>
  );
};

export default Message;
