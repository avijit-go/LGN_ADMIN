import React,{useLayoutEffect} from 'react';
import { GlobalContext } from '../../Context/Context';
import {Box} from "@chakra-ui/react";
import "./Home.css";
import { MdKeyboardBackspace } from "react-icons/md";
import Layout from '../../Layout/Layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {useSpring, animated} from "react-spring";

function TotalUserNo({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 }
  });
  return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}

function TotalStreamerNo({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 }
  });
  return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}

function TotalStreamsNo({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 }
  });
  return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}

function TotalPendingStreamsNo({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 }
  });
  return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}


ChartJS.register(ArcElement, Tooltip, Legend);
const Home = () => {
  const {setPageType} = GlobalContext();

  useLayoutEffect(() => {
    setPageType('home');
  }, []);

  const data = {
    labels: [
      `Users: 100`,
      `Streamers: 45`
    ],
    datasets: [
      {
        label: " user",
        data: [100, 45],
        backgroundColor: [
          "rgba(255, 121, 121, 1)",
          "rgba(72, 52, 212, 1)",
          "rgba(240, 147, 43, 1)",
          "rgba(126, 214, 223, 1)",
        ],
        borderColor: [
          "rgba(255, 121, 121, 0.3)",
          "rgba(72, 52, 212, 0.3)",
          "rgba(240, 147, 43, 0.3)",
          "rgba(126, 214, 223, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data1 = {
    labels: [
      `Total Streams: 20`,
      `Total pending streams: 5`
    ],
    datasets: [
      {
        label: " user",
        data: [100, 45],
        backgroundColor: [
          "rgba(240, 147, 43, 1)",
          "rgba(126, 214, 223, 1)",
        ],
        borderColor: [
          "rgba(240, 147, 43, 0.3)",
          "rgba(126, 214, 223, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <Layout page="home">
      <Box className='home_container'>
        {/* Header Section */}
        <Box className="header_section">
        <span className='header_title'>Home</span>
        </Box>
        {/* Analytics Section */}
        <Box className='analytics_section'>
          <Box className="analytics_box">
            <Box className="inner_cntainer">
              <Box className='analytics_text'>Total Users</Box>
              <Box className='analytics_count'><TotalUserNo n={100} /></Box>
            </Box>
          </Box>

          <Box className="analytics_box">
            <Box className="inner_cntainer">
              <Box className='analytics_text'>Total Streamers</Box>
              <Box className='analytics_count'><TotalStreamerNo n={45} /></Box>
            </Box>
          </Box>

          <Box className="analytics_box">
            <Box className="inner_cntainer">
              <Box className='analytics_text'>Total Streames</Box>
              <Box className='analytics_count'><TotalStreamsNo n={20} /></Box>
            </Box>
          </Box>

          <Box className="analytics_box">
            <Box className="inner_cntainer">
              <Box className='analytics_text'>Total no. of pending stream</Box>
              <Box className='analytics_count'><TotalPendingStreamsNo n={5} /></Box>
            </Box>
          </Box>
        </Box>

        {/* Graph Details Section */}
        <Box className='pie_container'>
          <Pie data={data} />
          <Pie data={data1} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Home;