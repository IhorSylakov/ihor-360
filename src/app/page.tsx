import Link from 'next/link';
import Image from 'next/image';
import Intro from '@/components/Intro';
import { CSSProperties } from 'react';
import TwoColumns from '@/components/TwoColumns';
import Section from '@/components/Section';
import List from '@/components/CardsList';
import Card from '@/components/Card';
import { listItem } from '@/types/types';

const list1: listItem[] = [
  {
    image: "/images/landing1.jpg",
    title: "Легкий доступ к вашим путешествиям и историям через фотографии",
    text: "Загружайте свои 360-градусные фотографии и делитесь ими с друзьями.",
  },
  {
    image: "/images/landing2.jpg",
    title: "Организуйте фотографии по странам, городам и конкретным местам",
    text: "Упорядочите свои воспоминания, чтобы легко их находить и делиться.",
  },
  {
    image: "/images/landing3.jpg",
    title: "Добавляйте описания и делитесь своими историями о путешествиях",
    text: "Расскажите о своих приключениях и впечатлениях с помощью текстовых описаний.",
  }
];

const list2: listItem[] = [
  {
    title: "Легкость загрузки и организации фотографий",
    text: "Простой интерфейс позволяет легко загружать и сортировать ваши снимки.",
  },
  {
    title: "Добавление описаний к вашим фотографиям",
    text: "Делитесь своими впечатлениями, добавляя описания к фотографиям.",
  },
  {
    title: "Делитесь своими фотографиями с друзьями",
    text: "Легко делитесь своими путешествиями с близкими.",
  },
  {
    title: "Исследуйте мир через ваши панорамы",
    text: "Позвольте друзьям погрузиться в ваши приключения.",
  }
];

export default function HomePage() {
  return (
    <>
      <div
        className="page"
      >
        <Intro>
          <>
            <h1>
              Добро пожаловать в мир панорамных фотографий
            </h1>
            <p>
              Наш сайт предлагает уникальную платформу для обмена 360-градусными панорамными фотографиями. Делитесь своими путешествиями и историями с друзьями и близкими, погружая их в атмосферу ваших приключений.
            </p>
            <div className="sectionButtonRow">
              <Link
                href="/user1"
                className="button"
              >
                Узнать больше
              </Link>
              {/* <Link
                href="/register"
                className="button"
              >
                Register
              </Link> */}
            </div>
          </>
          <>
            <Image
              width={540}
              height={540}
              alt="Ваш личный дневник покупок и решений"
              src="/images/intro.jpg" 
            />
          </>
        </Intro>
        <Section>
          <h2 style={{ textAlign: 'center' }}>Основные функции для загрузки и организации ваших панорамных фотографий</h2>
          <List
            list={list1}
            type="grid"
            ItemComponent={Card}
            style={{ "--list-gr-c": "1fr 1fr 1fr", "--gl-gap": "10px" } as CSSProperties}
          />
        </Section>
        <Section>
          <h2 style={{ textAlign: 'center' }}>Преимущества использования нашей платформы для панорамных фотографий</h2>
          <TwoColumns
            style={{ "--column-align": "center" } as CSSProperties}
          >
            <>
              <p>Наша платформа предлагает уникальный способ делиться вашими путешествиями с друзьями и семьей. Вы можете легко загружать и организовывать свои панорамные фотографии, создавая незабываемые истории о ваших приключениях.</p>
            </>
            <>
              <Image
                width={500}
                height={500}
                alt="Healthcare Journey Mapping"
                src="/images/landing4.jpg"
                style={{ margin: "0 auto" }}
              />
            </>
          </TwoColumns>
        </Section>
        <Section>
          <TwoColumns
            style={{ "--column-align": "center", "--stcgg": "30px" } as CSSProperties}
          >
            <>
              <h2>Как загружать и делиться фотографиями</h2>
              <p>Загрузите свои 360-градусные фотографии и организуйте их по странам и городам. Добавьте описания, чтобы поделиться своими историями и впечатлениями с друзьями.</p>
              {/* <Link
                href="/register"
                className="button"
              >
                Register
              </Link> */}
            </>
            <>
              <List
                list={list2}
                type="grid"
                ItemComponent={Card}
                style={{ "--list-gr-c": "1fr 1fr", "--gl-gap": "10px" } as CSSProperties}
              />
            </>
          </TwoColumns>
        </Section>
      </div>
    </>
  );
}
