import Style from "./Menu.module.scss";

const Menu = (): JSX.Element => {
  return(
    <div className={Style.MenuButton}>
      <button>MENU</button>
    </div>
  );
};

export default Menu;
