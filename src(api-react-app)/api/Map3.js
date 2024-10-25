import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

function MyMap3() {

    const [result, setResult] = useState("")
    const [position, setPosition] = useState([])
    //지도에 표시될 마커들의 리스트 상태
    const [markers, setMarkers] = useState([])

    //검색한 키워드를 저장하는 상태
    const [keyword, setKeyword] = useState('')
    
    //생성된 카카오 맵 객체를 저장할 상태
    const [map, setMap] = useState(null)

    //활성화된 마커의 id를 관리하는 state
    const [activeMarker, setActiveMarker] = useState()

    //카카오 장소 검색 API를 호출하는 함수
    const searchPlaces = (searchKeyword) => {
        //map 객체와 카카오 지도 API가 로드되지 않으면 함수 종료
        if(!map || !window.kakao || !window.kakao.maps.services) {
            return
        }
        
        //카카오 장소 검색 객체 생성
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchKeyword,(data, status) => {
            //검색이 성공적으로 완료되었을 때
            if(status === window.kakao.maps.services.Status.OK){
                //지도 밖에 마커가 있을 때 
                //마커가 보이도록 지도 범위를 설정하기 위한 객체
                const bounds = new window.kakao.maps.LatLngBounds()

                //검색된 장소 리스트를 마커로 변환
                const newMarkers = data.map(place => ({
                    position: {
                        lat: place.y, //장소의 위도
                        lng: place.x //장소의 경도
                    },
                    content: place.place_name //마커에 표시할 장소명
                }))

                //지도 위치를 수정하기 위해 bounds객체에 모든 마커의 좌표를 넣는다.
                newMarkers.forEach(marker => bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng)))

                //마커 리스트 상태를 업데이트
                setMarkers(newMarkers)

                //지도 좌표 재설정하기
                map.setBounds(bounds)
            } else {
                alert('검색 결과가 없습니다.')
            }
        })
    }

    const handleSearch = () => {
        //검색어가 비어있을 시 경고
            if(keyword == '') {
                alert('검색어를 입력해주세요')
                return
            }
            searchPlaces(keyword)
        }
    
    //지도의 중심 좌표
    const center = {
        lat:33.450701,
        lng:126.570667
    }

    //지도클릭시 마커 추가
    const handleMapClick = (event,mouseEvent)=>{
        const latlang = mouseEvent.latLng //좌표를 저장
        setResult(`클릭한 위치의 위도는 ${latlang.getLat()}이고, 경도는 ${latlang.getLng()}입니다.`)
        const newMarker = {
            id:markers.length, //배열의 길이를 id로 설정
            position: {
                lat:latlang.getLat(), //위도
                lng:latlang.getLng() //경도
            },
            info:`마커 위치: (${latlang.getLat()},${latlang.getLng()})`
        }
        setMarkers([...markers, newMarker])
    }

    //마커에 마우스를 올렸을 때 인포윈도우 활성화하기
    const handleMouseOver = (id) => {
        setActiveMarker(id)
    }

    //마커에서 마우스를 내렸을 때 인포윈도우 비활성화 
    const handleMouseOut = () => {
        setActiveMarker(null)
    }

    return(
        <div>
            <h2>주소를 검색해서 지도에 Marker를 찍어보세요.</h2>
            {/* 검색창과 버튼 */}
            <div style={{marginBottom:"10px"}}>
                <input
                    type="text"
                    value={keyword} //검색어의 상태를 입력창의 값으로 설정
                    onChange={(e) => setKeyword(e.target.value)} //입력할 때마다 검색어 상태를 업데이트
                    placeholder='검색어를 입력하세요' //입력창에 표시할 힌트 텍스트
                    style={{padding: "5px", marginRight: "5px"}}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div>
                <Map
                    center={center} // 지도 중심 좌표 lat: 위도, lng: 경도
                    style={{width:'600px', height:'600px'}} //지도의 너비와 높이
                    level={3} //지도 확대 정도. 숫자가 작을수록 크게, 클수록 작게보임
                    onClick={handleMapClick} //지도의 클릭 이벤트 핸들러
                >
                    {markers.map(marker => (
                        <MapMarker 
                            key={marker.id}
                            position={marker.position}
                            onClick={() => handleMouseOver(marker.id)} //클릭했을 때
                            // onMouseOver={() => handleMouseOver(marker.id)} // 마우스 올렸을 때
                            // onMouseOut={handleMouseOut} // 마우스 내렸을 때
                        >
                            {/* 마커에 자식요소를 넣으면 자동으로 info로 들어간다. */}
                            {activeMarker === marker.id && (
                                    <div style={{padding:"5px", color:"#000"}}>
                                        {marker.info}
                                    </div>
                            )}
                        </MapMarker>
                    ))}
                    {/* 마커는 좌표 위에 생성이 된다. */}
                    <MapMarker
                    // {position ?? center} (깃허브에 올라온 코드)
                    // position에 값이 없으면(null / undefined) center를 사용해라
                        position = {position ?? center}
                        // position = {position}
                    />

                    {/* 인포윈도우 생성하기
                    <MapInfoWindow //인포윈도우를 생성하고 지도에 표시한다.
                        position = {center} //인포윈도우가 표시될 위치
                        removable= {true} //인포윈도우를 닫을 수 있는 x버튼 표시
                    >
                        <div style={{padding:'5px', color:"#000"}}>Hello World</div>
                    </MapInfoWindow> */}
                </Map>
            </div>
        </div>
    )
}

export default MyMap3