# NUvention Team E

## Demo
# Instructions

1. Have expo downloaded on your phone 
2. Register a new account or log in your account
2. Scan this QRCode please (sorry, we only support ios version)
![Image of QRCode](ios.png)

## Components
The current application comprises of three components
1. React.JS front-end app
2. Node.JS Backend service
3. Pusher - SaaS for real-time messaging and push notification. **Credentials will be shared offline.**

## Current Code
The current code is isolated in two separate branches
* master - The front-end react-app
* server-master - The backend nodeJS service.

## 1. ReactJS Front-End App
Contact Person

| Name | Email |
| ----------------------|-----------------------------------------|
| Lingyun Li (Puno) | LingyunLi2018@u.northwestern.edu |
| Jiayi Suo (Joy) | JiayiSuo2020@u.northwestern.edu |
| Nirmal Balachundhar | NirmalBalachundhar2021@u.northwestern.edu |

### install expo:
```
npm install expo-cli --global
```
### enter project folder
```
cd loop 
```
### install dependencies:
```
npm install
```
### start
```
expo start
```

## 2. NodeJS Back-End Service
This service is designed to serve REST APIs. Currently it is using Redis as the primary source of the data and provides nearby loops. In the next quarter, we will introduce new persistant database for storage of user data (MongoDB or Cassandra).

Contact Person

| Name | Email |
| ----------------------|-----------------------------------------|
| Prerak Rustagi | PrerakRustagu2019@u.northwestern.edu |
| Nirmal Balachundhar | NirmalBalachundhar2021@u.northwestern.edu |

### install dependencies:
```
npm install
```

### start
```
npm start
```

### Current Deployment
BaseURL - https://loop-core.herokuapp.com

```
Endpoint: /api/loops/nearby
Method: GET
URL - https://loop-core.herokuapp.com/api/loops/nearby?lat=42.05&long=-87.67

Response 
{
  "entities": [
    {
      "id": "3772d000-7f65-49e6-b35f-07366a386f1e",
      "title": "Norris Game Room Club",
      "thumbnail": "",
      "metrics": {
        "member_count": "20"
      },
      "location": {
        "longitude": -87.67290741205215,
        "latitude": 42.05333950121226
      },
      "description": "Join the Norris game room club to know about all the indoor games and game-events.",
      "distance": "0.2748"
    },
    {
      "id": "59b92978-b6fb-4cbf-a5cc-ce6eb0b48ebc",
      "title": "Henry Crown Gym",
      "thumbnail": "",
      "metrics": {
        "member_count": "25"
      },
      "location": {
        "longitude": -87.67289131879807,
        "latitude": 42.059405088946555
      },
      "description": "Henry Crown Gym club is group of gym freaks! Join us if you are one of us...",
      "distance": "0.6667"
    }
  ]
}
```
