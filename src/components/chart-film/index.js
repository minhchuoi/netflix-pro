import React from "react";
import { Body } from "./styles/chart-film";

import { useContent } from '../../hooks';
import { BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend } from 'recharts'

export default function ChartFilm(props) {
  const { series } = useContent('series');
  const { films } = useContent('films');
  const slides = selectionFilter({ series, films });
  // const [dtSeries, setDtSeries] = useState([])
  // useEffect(() => {
  console.log(slides['series']);
  // }, [])
  return (
    <>
      <Body>
        <div className={props.displ}>
          <BarChart width={730} height={450} data={props.category == "series" ? slides['series'] : slides['films']}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Amount" fill="#1890ff" />
          </BarChart>
        </div>
      </Body>
    </>
  );
}
const selectionFilter = ({ series, films } = []) => {
  return {
    series: [
      {
        title: "Documentaries",
        Amount: (series?.filter((item) => item.genre === "documentaries")).length,
      },
      {
        title: "Comedies",
        Amount: (series?.filter((item) => item.genre === "comedies")).length,
      },
      {
        title: "Children",
        Amount: (series?.filter((item) => item.genre === "children")).length,
      },
      {
        title: "Crime",
        Amount: (series?.filter((item) => item.genre === "crime")).length,
      },
      {
        title: "Feel Good",
        Amount: (series?.filter((item) => item.genre === "feel-good")).length,
      },
    ],
    films: [
      { title: "Drama", Amount: (films?.filter((item) => item.genre === "drama")).length },
      {
        title: "Thriller",
        Amount: (films?.filter((item) => item.genre === "thriller")).length,
      },
      {
        title: "Children",
        Amount: (films?.filter((item) => item.genre === "children")).length,
      },
      {
        title: "Suspense",
        Amount: (films?.filter((item) => item.genre === "suspense")).length,
      },
      {
        title: "Romance",
        Amount: (films?.filter((item) => item.genre === "romance")).length,
      },
    ],
  };
}
