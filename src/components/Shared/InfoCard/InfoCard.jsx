import s from "./InfoCard.module.scss";

const InfoCard = ({ title, children }) => {
  return (
    <section className={s.infoCard}>
      <h3 className={s.title}>{title}</h3>
      {children}
    </section>
  );
};

export default InfoCard;
