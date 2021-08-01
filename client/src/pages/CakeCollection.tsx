import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

const ModalContent = styled.div`
  width: 30%;
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  background: white;
  padding: 10px;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input,
  textarea {
    margin-bottom: 10px;
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 1px dotted grey;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  p {
    text-align: center;
  }
`;

interface CollectionType {
  title: string;
  description: string;
  image: string;
  [key: string]: any;
}

const INITIAL_COLLECTION = {
  title: '',
  description: '',
  image: '',
};

const CakeCollection = () => {
  const [showModal, setShowModal] = useState(false);
  const [collection, setCollection] =
    useState<CollectionType>(INITIAL_COLLECTION);

  const { title, description, image } = collection;

  const onToggleModal = (): void => {
    setShowModal((show: boolean) => !show);
    onClear();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event?.target?.files && event?.target?.files[0]) {
      const img = event.target.files[0];
      const imgUrl = URL.createObjectURL(img);
      setCollection(collection => ({
        ...collection,
        image: imgUrl,
      }));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as any;
    setCollection(collection => ({
      ...collection,
      [name]: value,
    }));
  };

  const onAddCake = async (cake: CollectionType): Promise<void> => {
    const formData = new FormData();

    Object.keys(cake).forEach((key: any) => {
      console.log(cake[key]);
      formData.append(key, cake[key]);
    });

    try {
      const res = await axios.post('/collection/add', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
      if (res?.data) {
        console.log(res?.data);
      }
    } catch (err) {
      console.error(err?.message);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddCake(collection);
    onClear();
    onToggleModal();
  };

  const onClear = () => {
    setCollection(INITIAL_COLLECTION);
  };

  return (
    <section>
      <button onClick={onToggleModal}>Add a collection</button>
      <Modal open={showModal} onClose={onToggleModal}>
        <ModalContent>
          <h1>Add a new cake.</h1>

          {image !== '' ? (
            <ImageWrapper>
              <img src={image} alt="test" />
            </ImageWrapper>
          ) : (
            <ImageWrapper>
              <p>Upload an image</p>
            </ImageWrapper>
          )}
          <Form onSubmit={onSubmit}>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={onChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={onChange}
            />
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg"
              name="file"
              onChange={onImageChange}
            />
            <button>Add</button>
          </Form>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default CakeCollection;
