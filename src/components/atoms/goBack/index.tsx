import { Button } from '@smartech/ui';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      leading="icon"
      icons={{ start: 'arrow-left' }}
      className="my-2"
      onClick={() => navigate(-1)}
    >
      Go back
    </Button>
  );
};

export { GoBack };
