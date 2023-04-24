import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

type Props = {
    params: {
        city: string;
        lat: string;
        long: string;
    };
}

async function WeatherPage({params: {city, lat, long}} : Props) {
    const client = getClient()
    const { data } = await client.query({
        query: fetchWeatherQuery,
        variables: {
            current_weather: "true",
            longitude: long,
            latitude: lat,
            timezone: 'GMT'
        }
    })

    const results: Root = data.myQuery;

    console.log(results);

  return (
    <div>
        {/* Information Panel */}

        <div>
            <div className="p-5 ">
                <div className="pb-5">
                    <h2 className="text-xl font-bold">Todays overview</h2>
                    <p className="text-sm text-gray-400">
                        Last updated: {" "}
                        {new Date(results.current_weather.time).toLocaleString()} 
                        ({results.timezone})
                    </p>
                </div>

                <div className="m-2 mb-10"> 
                    {/* Callout Card */}
                    <CalloutCard
                        message={`It's currently ${results.current_weather.temperature}°C`}
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                    {/* Statcard */}
                    <StatCard
                        title="Maximum Temperature"
                        metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
                        color="yellow"
                    />

                    <StatCard
                        title="Minimum Temperature"
                        metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
                        color="green"
                    />

                    <div>
                        <StatCard
                            title="UV Index"
                            metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                            color="rose"
                        />
                        {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                            <CalloutCard
                                message="The UV Index is high today, be sure to wear sunscreen! 🧴"
                                warning
                            />
                        )}
                    </div>

                    <div className="flex space-x-3">
                        <StatCard
                            title="Wind Speed"
                            metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                            color="cyan"
                        />

                        <StatCard
                            title="Wind Direction"
                            metric={`${results.current_weather.winddirection}°`}
                            color="violet"
                        />
                    </div>

                </div>

            </div>

            <hr className="mb-5"/>

            <div className="space-y-3">
                {/* Charts */}
            </div>
        </div>
    </div>

  )
}

export default WeatherPage