import React, { useContext } from 'react';
import StarRating from '../../../../../app/common/star-rating/StarRating';
import { IReview } from '../../../../../app/models/review';
import { Form, Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import Button from '../../../../../app/common/button/Button';
import InputTextArea from '../../../../../app/common/form/text-area/InputTextArea';
import { RootStoreContext } from '../../../../../app/stores/rootStore';
import ErrorMessage from '../../../../../app/common/form/error/ErrorMessage';

const ReviewCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createReview, error } = rootStore.reviewStore;
  const { hairSalon } = rootStore.hairSalonStore;

  return (
    <div>
      <h3>Ostavi recenziju</h3>
      <Form
        onSubmit={(values: IReview) => createReview(hairSalon?.id!, values)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <StarRating />
            <Field
              name='comment'
              label='Komentar'
              block
              component={InputTextArea}
            />
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Kreiraj
            </Button>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default observer(ReviewCreate);
