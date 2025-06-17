import s from "./InfoCard.module.scss";

const InfoCard = ({ title, isNested, children }) => {
  return (
    <section className={`${s.infoCard} ${isNested ? s.nestedCard : ""}`}>
      {!isNested && <h3 className={s.title}>{title}</h3>}
      {isNested && <h4 className={s.title}>{title}</h4>}
      {children}
    </section>
  );
};

export default InfoCard;
