import React from "react";
import { Tag } from "antd";
import styles from "./chart-visualization.module.scss";

interface ChartData {
  type: "comparison" | "growth" | "countries";
  data: any;
}

interface ChartVisualizationProps {
  chartData: ChartData;
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({
  chartData,
}) => {
  const renderComparisonChart = () => (
    <div className={styles.comparisonChart}>
      <div className={styles.chartHeader}>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#10b981" }}
            ></span>
            <span>ebay.com</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#3b82f6" }}
            ></span>
            <span>amazon.com</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.addCompetitor}>+ Add competitor</span>
          </div>
        </div>
      </div>

      <div className={styles.chartArea}>
        <div className={styles.chartLines}>
          <svg viewBox="0 0 400 200" className={styles.chartSvg}>
            {/* Green line for ebay */}
            <path
              d="M20,180 Q60,120 120,140 T240,130 T380,150"
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
            />
            {/* Blue line for amazon */}
            <path
              d="M20,160 Q60,100 120,120 T240,110 T380,130"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricBars}>
            <div className={styles.metricBar}>
              <div
                className={styles.barFill}
                style={{ width: "70%", backgroundColor: "#10b981" }}
              ></div>
              <span className={styles.arrow}>↑</span>
            </div>
            <div className={styles.metricBar}>
              <div
                className={styles.barFill}
                style={{ width: "85%", backgroundColor: "#10b981" }}
              ></div>
              <span className={styles.arrow}>↑</span>
            </div>
            <div className={styles.metricBar}>
              <div
                className={styles.barFill}
                style={{ width: "60%", backgroundColor: "#3b82f6" }}
              ></div>
              <span className={styles.arrow}>↓</span>
            </div>
            <div className={styles.metricBar}>
              <div
                className={styles.barFill}
                style={{ width: "75%", backgroundColor: "#3b82f6" }}
              ></div>
              <span className={styles.arrow}>↓</span>
            </div>
          </div>
        </div>

        <div className={styles.chartTags}>
          <Tag color="blue">Organic</Tag>
          <Tag color="orange">Paid</Tag>
          <Tag color="green">Backlinks</Tag>
        </div>

        <div className={styles.domainInfo}>
          <div className={styles.domainItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#3b82f6" }}
            ></span>
            <span>Your domain</span>
          </div>
          <div className={styles.domainItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#10b981" }}
            ></span>
            <span>Your competitor</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrowthChart = () => (
    <div className={styles.growthChart}>
      <div className={styles.chartContainer}>
        <div className={styles.chartArea}>
          <svg viewBox="0 0 300 150" className={styles.chartSvg}>
            <path
              d="M20,130 Q60,80 120,100 T240,90 T280,110"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20,110 Q60,60 120,80 T240,70 T280,90"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className={styles.chartTags}>
          <Tag color="blue">Organic</Tag>
          <Tag color="orange">Paid</Tag>
          <Tag color="green">Backlinks</Tag>
        </div>

        <div className={styles.timeLabels}>
          <div className={styles.timeItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#a855f7" }}
            ></span>
            <span>Summer 2020</span>
          </div>
          <div className={styles.timeItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#3b82f6" }}
            ></span>
            <span>Autumn 2020</span>
          </div>
          <div className={styles.timeItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: "#f59e0b" }}
            ></span>
            <span>Growth</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCountriesChart = () => (
    <div className={styles.countriesChart}>
      <div className={styles.tableHeader}>
        <span>Countries</span>
        <span>Traffic share</span>
        <span>Traffic</span>
        <span>Keyword</span>
      </div>

      <div className={styles.countryRows}>
        <div className={styles.countryRow}>
          <div className={styles.countryFlag}>🇬🇧</div>
          <div className={styles.trafficBar}>
            <div
              className={styles.barFill}
              style={{ width: "80%", backgroundColor: "#3b82f6" }}
            ></div>
          </div>
          <span>12.2M</span>
          <span>United Kingdom</span>
        </div>
        <div className={styles.countryRow}>
          <div className={styles.countryFlag}>🇩🇪</div>
          <div className={styles.trafficBar}>
            <div
              className={styles.barFill}
              style={{ width: "60%", backgroundColor: "#3b82f6" }}
            ></div>
          </div>
          <span>6.4M</span>
          <span>Germany</span>
        </div>
      </div>

      <div className={styles.chartArea}>
        <svg viewBox="0 0 300 100" className={styles.chartSvg}>
          <path
            d="M20,80 Q60,40 120,50 T240,45 T280,55"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M20,70 Q60,30 120,40 T240,35 T280,45"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div className={styles.chartLabels}>
          <span>Jan 1</span>
          <span>Jan 5</span>
          <span>Jan 9</span>
        </div>
        <div className={styles.monthLabel}>March</div>
      </div>
    </div>
  );

  const renderChart = () => {
    switch (chartData.type) {
      case "comparison":
        return renderComparisonChart();
      case "growth":
        return renderGrowthChart();
      case "countries":
        return renderCountriesChart();
      default:
        return renderComparisonChart();
    }
  };

  return <div className={styles.chartVisualization}>{renderChart()}</div>;
};

export default ChartVisualization;
