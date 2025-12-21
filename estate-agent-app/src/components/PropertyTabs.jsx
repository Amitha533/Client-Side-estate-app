import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

/**
 * PropertyTabs Component
 * Displays property information in tabs (description, floor plan, map)
 * @param {String} longDescription - Detailed property description
 * @param {String} floorPlan - Floor plan image URL
 * @param {String} location - Property location for map
 */
const PropertyTabs = ({ longDescription, floorPlan, location }) => {
  
  /**
   * Generate Google Maps embed URL
   */
  const getMapUrl = () => {
    const encodedLocation = encodeURIComponent(location);
    return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="property-tabs">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content description-tab">
            <h3>Property Description</h3>
            <p>{longDescription}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content floorplan-tab">
            <h3>Floor Plan</h3>
            <img
              src={floorPlan}
              alt="Property floor plan"
              className="floor-plan-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Floor+Plan+Not+Available';
              }}
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content map-tab">
            <h3>Location</h3>
            <div className="map-container">
              <iframe
                title="Property location map"
                src={getMapUrl()}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs;