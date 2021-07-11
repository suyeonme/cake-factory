import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

const ModalContent = styled.div`
  width: 30%;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  background: white;
`;

interface CollectionType {
  title: string;
  description: string;
  img: string;
}

const CakeCollection = () => {
  const [showModal, setShowModal] = useState(false);
  const [collection, setCollection] = useState<CollectionType>({
    title: '',
    description: '',
    img: '',
  });

  const { title, description, img } = collection;

  const onToggleModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowModal((show: boolean) => !show);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event?.target?.files && event?.target?.files[0]) {
      const img = event.target.files[0];
      const imgUrl = URL.createObjectURL(img);
      setCollection(collection => ({
        ...collection,
        img: imgUrl,
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

  return (
    <section>
      <button onClick={onToggleModal}>Add a collection</button>
      <Modal open={showModal} onClose={onToggleModal}>
        <ModalContent>
          {/* <img src={image} alt="test" /> */}
          <h1>Add a new cake.</h1>
          <form>
            <input name="title" type="text" value={title} onChange={onChange} />
            <textarea
              name="description"
              value={description}
              onChange={onChange}
            />
            <input type="file" name="myImage" onChange={onImageChange} />
          </form>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default CakeCollection;
