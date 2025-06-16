import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./HealthTips.css";

const tips = [
  "Wear a high-quality N95 or KN95 mask when stepping outside, especially on days with high pollution levels. These masks filter out harmful particles like PM2.5 which can penetrate deep into the lungs and bloodstream.",
  "Invest in a certified HEPA air purifier for your home, particularly for rooms you spend the most time in, such as the bedroom or office. It helps to remove pollutants, allergens, and fine particles from indoor air.",
  "During peak pollution hours or smog alerts, keep windows and doors tightly shut to prevent outside air from seeping into your living space. Use draft stoppers or seals around windows and doors if necessary.",
  "Avoid vigorous outdoor activities such as jogging, running, or cycling when air quality is poor. Physical exertion increases the rate of inhalation and causes deeper penetration of pollutants into your lungs.",
  "After being exposed to polluted environments, take a thorough shower and change into clean clothes to remove particulate matter from your skin and hair, preventing it from lingering indoors.",
  "Drink plenty of water throughout the day to stay hydrated. Proper hydration helps the kidneys and liver flush toxins out of the body more efficiently, supporting your overall detox system.",
  "Check daily air quality reports using apps or websites like AQICN, AirVisual, or local meteorological services. Adjust your outdoor plans accordingly based on the AQI levels.",
  "Introduce indoor plants such as snake plants, spider plants, or peace lilies which are known for their natural air-purifying properties. They help absorb toxins like benzene and formaldehyde.",
  "Avoid burning candles, incense, or smoking indoors. These activities release fine particulate matter and volatile organic compounds (VOCs), which can worsen indoor air quality significantly.",
  "If you suffer from asthma, COPD, or any other respiratory illness, consult a doctor about using preventive inhalers or medications. Regular checkups and having an action plan in place are crucial during high-pollution seasons."
];

function HealthTips() {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        fontSize: "1.1rem",
        maxWidth: "950px",
        margin: "auto"
      }}
    >
      <h3 className="mb-4 text-center">Health Tips for Living in Poor Air Quality</h3>
      <Accordion flush className="dark-accordion">
        {tips.map((tip, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>Tip {index + 1}</Accordion.Header>
            <Accordion.Body>{tip}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default HealthTips;
