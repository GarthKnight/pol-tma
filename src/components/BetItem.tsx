import React from 'react';
import './BetItem.css';

interface BetItemProps {
  title: string;
  subtitle: string;
  redNumber: number;
  greenNumber: number;
}

const BetItem: React.FC<BetItemProps> = ({ title, subtitle, redNumber, greenNumber }) => {
  return (
    <div className="bet-item">
      <div className="content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="rectangles">
          <div className="rectangle red">{redNumber}</div>
          <div className="rectangle green">{greenNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default BetItem;
