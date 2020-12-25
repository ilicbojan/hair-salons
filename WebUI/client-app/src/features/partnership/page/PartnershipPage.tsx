import { observer } from 'mobx-react-lite';
import React from 'react';
import ContactForm from '../contact-form/ContactForm';

const PartnershipPage = () => {
  return (
    <div>
      <ContactForm />
    </div>
  );
};

export default observer(PartnershipPage);
