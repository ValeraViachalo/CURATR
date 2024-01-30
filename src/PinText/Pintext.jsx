import React, { useState, useEffect } from 'react';

function Pintext() {
  const [tabCount, setTabCount] = useState(0);

  useEffect(() => {
    // Отримати поточну кількість вкладок з localStorage
    const currentCount = Number(localStorage.getItem('tabCount')) || 0;

    // Збільшити кількість вкладок на 1
    const newCount = currentCount + 1;
    localStorage.setItem('tabCount', newCount);
    setTabCount(newCount);
  }, []);

  useEffect(() => {
    // Функція для зменшення кількості вкладок на 1
    const decrementTabCount = () => {
      const currentCount = Number(localStorage.getItem('tabCount')) || 0;
      localStorage.setItem('tabCount', currentCount - 1);
    };

    // Додати обробник подій при закритті вкладки
    window.addEventListener('beforeunload', decrementTabCount);

    // Видалити обробник подій при закритті вкладки
    return () => {
      window.removeEventListener('beforeunload', decrementTabCount);
    };
  }, []); // Додати обробник подій тільки один раз під час монтування компонента

  return (
    <div style={{ color: 'black', fontSize: '10vw' }}>
      {tabCount === 1 ? 'Немає копій' : `${tabCount} копії`}
    </div>
  );
}

export default Pintext;
