import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import LoadingSpinner from '../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../app/stores/rootStore';
import WorkingHoursCreate from './create/WorkingHoursCreate';
import WorkingHoursEdit from './edit/WorkingHoursEdit';

const WorkingHours = () => {
  const rootStore = useContext(RootStoreContext);
  const { myHairSalon, loadingMyHairSalon } = rootStore.hairSalonStore;

  if (loadingMyHairSalon) return <LoadingSpinner />;

  return (
    <div>
      {myHairSalon?.workingHours === undefined ||
      myHairSalon?.workingHours.length === 0 ? (
        <WorkingHoursCreate />
      ) : (
        <WorkingHoursEdit />
      )}
    </div>
  );
};

export default observer(WorkingHours);
