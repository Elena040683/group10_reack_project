import s from './ReportList.module.css';
import sprite from '../../svg/sprite.svg';
import formatThousands from 'format-thousands';

const onHandleSelectCategory = () => {};

const ReportListItem = ({ report }) => {
  return (
    <li className={s.reportListItem}>
      <div onClick={onHandleSelectCategory} className={s.reportListItemCard}>
        <p className={s.reportListItemTextAmount}>
          {formatThousands(report.amount, ' ')}{' '}
        </p>
        <div className={s.reportListItemIcon}>
          <svg
            className={s.reportListIcon}
            fill="#071F41"
            width="56"
            height="56"
          >
            <use href={`${sprite}#${report.icon}`}></use>
          </svg>
        </div>
        <p className={s.reportListItemTextTitle}> {report.category}</p>
      </div>
    </li>
  );
};

export default ReportListItem;
