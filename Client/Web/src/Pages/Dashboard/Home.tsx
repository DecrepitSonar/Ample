import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from "react"
import { BsPersonCircle, BsUpload } from "react-icons/bs"
import { LuUpload, LuWaves } from "react-icons/lu"

import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import { axisClasses } from "@mui/x-charts";
import { useOutletContext } from "react-router-dom";
import httpclient from "../../httpclient";


type DashboardUploadsType = {
  author: string
  author_id: string
  category: string 
  contenturl: string
  genre: string
  id: string
  imageurl: string
  playcount: number
  playlist_id: string | null
  title: string
  tracknumber: number
  type: string
  upload_date: string
}





function Home(){
  
  const { setOpenUploadModal } = useOutletContext()
  const [ uploads, setUploads ] = useState<[DashboardUploadsType]>()
  
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 1231];
  const pData = [2400, 1398, 9800, 3908, 14800, 43800, 123123];
  const xLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  

  const getDashboardData = async () => {
    try{
      const response = await httpclient.get('http://127.0.0.1:5000/')
     setUploads( response.data )
    }
    catch( error ){
      console.log( error )
    }
  }

  useEffect(() => {
    getDashboardData()
  },[])

    return (
    <div className="dash_main_content">
      <h1>Dashboard</h1>
      <header>
        <span>Quick Actions</span>
      </header>

      <div className=" home_header">
        <button onClick={() => setOpenUploadModal(true)}><i><BsUpload/></i> Audio</button>
        <button><i><BsUpload/></i> Playlist</button>
      </div>
      <div className="dash_header_section">
      <div className="dash_info_box">
        <h1>{uploads?.length}</h1>
        <span> <i><LuUpload/></i>Uploads</span>
      </div>
      <div className="dash_info_box">
        <h1>1231</h1>
        <span><i><BsPersonCircle/></i>Followers</span>
      </div>
      <div className="dash_info_box">
        <h1>123,123</h1>
        <span><i><LuWaves/></i>Streams</span>
      </div>

      </div>
      <div className="chartContainer">
        <LineChart
        height={350}
        series={[
          { data: uData, label: 'Followers', id: 'uvId', color: '#fff',  },
          { data: pData, label: 'Streams', id: 'pvId', color: 'rgb(198, 160, 104)' }]}
        xAxis={[{ scaleType: 'point', data: xLabels}]}
        yAxis={[{ width: 50, stroke: 'red' }]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 0.5,
          },
          [`.${markElementClasses.root}`]: {
            stroke: "red",
          },
          [`.${lineElementClasses.root}[data-series="pvId"]`]: {
            strokeDasharray: '5 5',
          },
          [`.${lineElementClasses.root}[data-series="uvId"]`]: {
            strokeDasharray: '3 4 5 2',
          },
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
            fill: '#fff',
          },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: 'red',
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.label}`]: {
              stroke: 'rgb(198, 160, 104)',
              strokeWidth: 1,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: '#fff'
            },
          },
        }}
        margin={margin}/>
      </div>
      {
          uploads && 
          <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Streams</th>
              <th>Type</th>
              <th>Uploaded</th>
            </tr>
          </thead>
            <tbody>
              {
                uploads.length > 0 ? 
                  uploads.map( (item, index ) => {
                    return <tr key={index}>
                      <td>
                        <div className="table_data_header">
                          <img src={item.imageurl} alt="" />
                          {item.title}
                        </div> 
                        </td>
                      <td>{item.playcount}</td>
                      <td>{item.type}</td>
                      <td>{item.upload_date}</td>
                    </tr>

                  })  : <></>
               }

            </tbody>
          </table> 
        }
      </div>
    )
  }

export default Home