import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { S } from './SideDrawer.style';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';
import LoginForm from '../../../../features/users/login/LoginForm';
import RegisterForm from '../../../../features/users/register/RegisterForm';
import {
  FaHandshake,
  FaHome,
  FaLandmark,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

interface IProps {
  show: boolean;
  click: () => void;
}

const SideDrawer: React.FC<IProps> = ({ show, click }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { isLoggedIn, isClient, logout } = rootStore.userStore;
  const { myHairSalon } = rootStore.hairSalonStore;

  const handleOpenLoginModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <LoginForm />);
  };

  const handleOpenRegisterModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <RegisterForm />);
  };

  return (
    <S.SideDrawer show={show}>
      <ul>
        <li onClick={click}>
          <FaHome />
          <NavLink to='/'>Početna</NavLink>
        </li>
        <li onClick={click}>
          <FaLandmark />
          <NavLink to='/salons'>Saloni</NavLink>
        </li>
        <li onClick={click}>
          <FaHandshake />
          <NavLink to='/partnership'>Partnerstvo</NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li onClick={click}>
              <FaSignInAlt />
              <button onClick={handleOpenLoginModal} type='button'>
                Prijava
              </button>
            </li>
            <li onClick={click}>
              <FaUserPlus />
              <button onClick={handleOpenRegisterModal} type='button'>
                Registracija
              </button>
            </li>
          </>
        )}
        {isLoggedIn && <hr />}

        {isLoggedIn &&
          (isClient ? (
            <S.SubNavLinks>
              <li onClick={click}>
                <NavLink to={'/salons/' + myHairSalon?.id}>Moj salon</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/reservations'>Rezervacije</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/my-hair-salon'>Izmeni salon</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/working-hours'>Radno vreme</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/services'>Usluge</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/images'>Slike</NavLink>
              </li>
              <li onClick={click}>
                <button onClick={logout} type='button'>
                  Odjavi se
                </button>
              </li>
            </S.SubNavLinks>
          ) : (
            <S.SubNavLinks>
              <li onClick={click}>
                <NavLink to='/reservations'>Rezervacije</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/favourites'>Omiljeni</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/profile/edit'>Izmeni profil</NavLink>
              </li>
              <li onClick={click}>
                <button onClick={logout} type='button'>
                  Odjavi se
                </button>
              </li>
            </S.SubNavLinks>
          ))}
      </ul>
    </S.SideDrawer>
  );
};

export default observer(SideDrawer);
