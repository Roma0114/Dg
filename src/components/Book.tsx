import React, { useState } from 'react';
import { memories } from '../data/memories';
import './Book.css';

// Tip tanımlamaları
type PageType = 'cover' | 'end' | 'back-cover';

interface SpecialPage {
  type: PageType;
  text?: string;
}

interface MemoryPage {
  id: number;
  imageUrl: string;
  text: string;
}

type PageContent = MemoryPage | SpecialPage;

interface Leaf {
  front: PageContent;
  back: PageContent;
}

const Book: React.FC = () => {
  const [flippedPages, setFlippedPages] = useState<number[]>([]);

  const handlePageClick = (index: number) => {
    if (flippedPages.includes(index)) {
      setFlippedPages(flippedPages.filter(i => i !== index));
    } else {
      setFlippedPages([...flippedPages, index].sort((a, b) => a - b));
    }
  };

  const createLeaves = (): Leaf[] => {
    const bookLeaves: Leaf[] = [];
    const endText = 'İyi ki tanışmışız, iyi ki benimlesin sevgilim. Seninle beraber geçireceğimiz nice mutlu yıllarımız olsun. Doğum günün kutlu olsun ❤️';

    // 1. Kapak Sayfası
    bookLeaves.push({
      front: { type: 'cover' },
      back: memories[0]
    });

    // 2. Anı Sayfaları
    for (let i = 1; i < memories.length; i += 2) {
      if (i + 1 < memories.length) {
        bookLeaves.push({
          front: memories[i],
          back: memories[i + 1]
        });
      } else {
        bookLeaves.push({
          front: memories[i],
          back: { type: 'end', text: endText }
        });
      }
    }

    // 3. Kapanış ve Arka Kapak
    const lastLeaf = bookLeaves[bookLeaves.length - 1];
    const isSpecial = (p: PageContent): p is SpecialPage => 'type' in p;

    if (!isSpecial(lastLeaf.back)) {
      bookLeaves.push({
        front: { type: 'end', text: endText },
        back: { type: 'back-cover' }
      });
    } else if (lastLeaf.back.type === 'end') {
      bookLeaves.push({
        front: { type: 'back-cover' },
        back: { type: 'back-cover' }
      });
    }

    return bookLeaves;
  };

  const leaves = createLeaves();

  const renderPage = (content: PageContent, index: number, side: 'front' | 'back') => {
    const isSpecial = 'type' in content;
    const pageNum = side === 'front' ? index * 2 + 1 : index * 2 + 2;

    if (isSpecial) {
      const sp = content as SpecialPage;
      if (sp.type === 'cover') {
        return (
          <div className="cover-content">
            <div className="corner-ribbon">
              <div className="ribbon-line line-1"></div>
              <div className="ribbon-line line-2"></div>
            </div>
            <p className="cover-instruction">Tıkla yavrum</p>
            <img src="/src/image/helbatman.jpg" alt="Hell Batman" className="cover-image" />
          </div>
        );
      } else if (sp.type === 'end') {
        return (
          <div className="end-content">
            <h2 className="page-text final-message">{sp.text}</h2>
          </div>
        );
      } else {
        return (
          <div className="cover-content">
            <div className="back-cover-design">❤️</div>
          </div>
        );
      }
    } else {
      const mp = content as MemoryPage;
      return (
        <>
          <img src={mp.imageUrl} alt="Memory" className="page-image" />
          <p className="page-text">{mp.text}</p>
          <span className="page-number">{pageNum}</span>
        </>
      );
    }
  };

  return (
    <div className="book-container">
      <div className="book" style={{ transform: flippedPages.length > 0 ? 'translateX(50%)' : 'translateX(0)' }}>
        {leaves.map((leaf, index) => {
          const isFrontCover = 'type' in leaf.front && (leaf.front.type === 'cover' || leaf.front.type === 'back-cover');
          const isBackCover = 'type' in leaf.back && (leaf.back.type === 'back-cover' || leaf.back.type === 'cover');

          return (
            <div
              key={index}
              className={`page ${flippedPages.includes(index) ? 'flipped' : ''}`}
              style={{ zIndex: flippedPages.includes(index) ? index + 1 : leaves.length - index }}
              onClick={() => handlePageClick(index)}
            >
              <div className={`front ${isFrontCover ? 'cover' : ''}`}>
                <div className="page-content">
                  {renderPage(leaf.front, index, 'front')}
                </div>
              </div>
              <div className={`back ${isBackCover ? 'cover' : ''}`}>
                <div className="page-content">
                  {renderPage(leaf.back, index, 'back')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Book;
