import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

const CollegeIcon = ({size="xl"}) => {
  return (
    <div>
      <FontAwesomeIcon icon={faBuildingColumns} size={size} color="white" /> 
    </div>
  );
};

export default CollegeIcon;
