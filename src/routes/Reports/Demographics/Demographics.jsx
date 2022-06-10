import React from "react"
import { SectionHeader } from "../../../components/SectionHeader/SectionHeader"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bubble } from "react-chartjs-2"
import {
  generateRandomNumber,
  generateRandomColor,
} from "./../../../statics/allFunctions"
import "./Demographics.css"
ChartJS.register(LinearScale, PointElement, Tooltip, Legend)
import { faker } from "@faker-js/faker"

export default function Demographics() {
  const data = {
    labels: ["Abuja", "Lagos", "Asaba", "Owerri", "Calabar"],
    datasets: [
      {
        label: "Locations",
        data: [
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
          generateRandomNumber(1, 3463423),
        ],
        backgroundColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const bubbleOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const bubbleData = {
    datasets: [
      {
        label: "Men",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
      },
      {
        label: "Women",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <div
      className="fadeIn d-flex flex-column flex-grow-1 h-100 overflow-auto scrollbar"
      id="summaries">
      {/* Demographics */}
      <div id="charts-analytics" className="container-fluid mt-3 ">
        <div className="row">
          <div className="col col-8">
            <div className="d-flex justify-content-between align-items-center m-1 mb-3">
              <span className="col-9 text-nowrap">
                <SectionHeader text={"Demographics Data"} />
              </span>
              <select
                className="form-select w-50"
                aria-label="Default select example">
                <option value="1">Last 7 Days</option>
                <option value="2">Last 30 Days</option>
                <option value="3">Last 60 Days</option>
                <option value="3">Last 90 Days</option>
                <option value="3">All Time</option>
              </select>
            </div>
            <div className="col col p-3 flat-card-style">
              <Bubble options={bubbleOptions} data={bubbleData} />
            </div>
          </div>

          <div className="col col-4">
            <div className="row justify-content-end">
              <div className="col col-7">
                <select className="form-select mb-3">
                  <option value="1">Last 7 Days</option>
                  <option value="2">Last 30 Days</option>
                  <option value="3">Last 60 Days</option>
                  <option value="3">Last 90 Days</option>
                  <option value="3">All Time</option>
                </select>
              </div>
            </div>
            <div className="p-3 flat-card-style">
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
