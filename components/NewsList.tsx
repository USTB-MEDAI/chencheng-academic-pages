import NewsItem from './NewsItem'
import data from './data/news.json'

const NewsList = (): JSX.Element => {
    // 按日期从新到旧排序
    const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date))

    return (
        <section className="grid w-full scroll-mt-12" id="news">
            <h2 className="text-3xl font-bold mt-12 mb-4">News(2023 to now)</h2>
            <div>
                {sortedData.map((news, index) => (
                    <NewsItem news={news} index={index} key={news.id}/>
                ))}
            </div>
        </section>
    );
};

export default NewsList;
