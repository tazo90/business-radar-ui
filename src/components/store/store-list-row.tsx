import React from 'react';
import styled from 'styled-components';

// import CircleProgress from '@components/CircleProgress';

import icons from '@constants/icons';
import callIcon from '@assets/call.png';
import saveIcon from '@assets/save.png';

import restaurantImg from '@assets/restaurant.jpg';
import employeesImg from '@assets/employees.png';
import jobsImg from '@assets/jobs.png';
import trainingImg from '@assets/training.png';
import reviewsImg from '@assets/reviews.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid #7e7e7e;
  background: #545d67;
  border-radius: 10px;
  width: 480px;
  height: 172px;
  padding: 8px;
  border-left: 4px solid ${(props) => (props.isActive ? '#55d48b' : '#545d67')};

  &:hover {
    border-left: 4px solid #55d48b;
    transition: all 0.4s ease;
  }
`;

const LocationSider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;

  img {
    object-fit: cover;
    border-radius: 8px;
    width: 100%;
  }
`;

const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 250px;
  margin: 0 10px;
`;

const LocationHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 1.5rem;
  background: #fff;
  min-width: 50%;
  padding: 1px 15px 1px 10px;
  border: 1px solid #707070;

  img {
    object-fit: cover;
    margin-right: 0.5rem;
  }

  .name {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    line-height: 1.1;
    width: 100%;

    &__brand {
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 6px;
  color: white;
  font-size: 13px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;

  &:first-child {
    padding-top: 0.5rem;
  }

  p {
    margin-bottom: 0;
  }

  .label {
    font-weight: bold;
    margin-right: 6px;
  }
`;

const LocationActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  top: -6px;

  img,
  svg {
    width: 36px;
    height: 36px;
  }
`;

const Divider = styled.div`
  width: 50px;
  background-color: #c2c2c2;
  height: 2px;
  position: relative;
  top: 10px;
`;

const Summary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 18px;
  color: #ececec;
  font-size: 10px;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 5px;

  img {
    width: 17px;
    height: 17px;
  }

  .label {
    border-bottom: 1px solid #b8b8b8;
  }
`;

export default function LocationRow({ store, isActive }) {
  const brandName = store.brand_full.toLowerCase();

  return (
    <Wrapper>
      <Location isActive={isActive}>
        <LocationSider>
          <img src={restaurantImg} alt={store.name} />

          <Divider />
          <Summary>
            <SummaryItem>
              <img src={employeesImg} />
              <div className="label">Employees</div>
              <div className="value">30</div>
            </SummaryItem>
            <SummaryItem>
              <img src={jobsImg} />
              <div className="label">Jobs</div>
              <div className="value">30</div>
            </SummaryItem>
            <SummaryItem>
              <img src={trainingImg} />
              <div className="label">Trained</div>
              <div className="value">90%</div>
            </SummaryItem>
            <SummaryItem>
              <img src={reviewsImg} />
              <div className="label">Reviews</div>
              <div className="value">120</div>
            </SummaryItem>
          </Summary>
        </LocationSider>

        <LocationDetails>
          <LocationHeader>
            <img src={icons.amrest.markers[store.brand]} alt={brandName} />
            <div className="name">
              <div className="name__brand">{brandName}</div>
              <div className="name__location">{store.name}</div>
            </div>
          </LocationHeader>

          <Divider style={{ left: '40%' }} />

          <LocationInfo>
            {store.located_in_name &&
              <InfoItem>
                <p className="label">Located in: </p>
                <p>{store.located_in_name}</p>
              </InfoItem>
            }
            <InfoItem>
              <p className="label">Address: </p>
              <p>{store.address}</p>
            </InfoItem>
            {store.opening_hours &&
              <InfoItem>
                <p className="label">Hours: </p>
                <p>{store.opening_hours}</p>
              </InfoItem>
            }
            {store.phone &&
              <InfoItem>
                <p className="label">Phone: </p>
                <p>{store.phone}</p>
              </InfoItem>
            }
          </LocationInfo>
        </LocationDetails>

        <LocationActions>
          {/* <CircleProgress strokeWidth={15} sqSize={140} percentage={80} /> */}
          <img src={callIcon} />
          <img src={saveIcon} />
        </LocationActions>
      </Location>
    </Wrapper>
  );
}
