import data from './data/team.json'

interface Graduate {
    name: string;
    chineseName?: string;
    degree: string;
    graduationYear: string;
    destination: string;
    destinationEn?: string;
}

interface CurrentStudent {
    name: string;
    chineseName?: string;
    degree: string;
    year: string;
}

const TeamList = (): JSX.Element => {
    return (
        <section className="grid w-full scroll-mt-12" id="team">
            <h1 className="text-5xl font-bold mt-8 mb-8 text-center">Team</h1>
            
            {/* 毕业生部分 */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Alumni</h3>
                <div className="space-y-3">
                    {[...data.graduates]
                        .sort((a: Graduate, b: Graduate) => a.graduationYear.localeCompare(b.graduationYear))
                        .map((graduate: Graduate, index: number) => {
                        // 根据学位类型设置degree标签的颜色
                        const getBadgeColor = (degree: string) => {
                            switch (degree.toLowerCase()) {
                                case 'b.s.':
                                case 'bachelor':
                                case 'undergraduate':
                                    return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200';
                                case 'master':
                                case 'postgraduate':
                                    return 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200';
                                case 'phd':
                                case 'doctoral':
                                case 'ph.d.':
                                    return 'bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200';
                                default:
                                    return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
                            }
                        };
                        
                        const badgeColor = getBadgeColor(graduate.degree);
                        
                        return (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {graduate.name}
                                            {graduate.chineseName && (
                                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                                    {graduate.chineseName}
                                                </span>
                                            )}
                                        </h4>
                                        <span className={`text-sm ${badgeColor} px-2 py-1 rounded`}>
                                            {graduate.degree}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {graduate.graduationYear}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {graduate.destination}
                                    </p>
                                    {graduate.destinationEn && (
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                                            {graduate.destinationEn}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 现在学生部分 */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Current Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...data.currentStudents]
                        .sort((a: CurrentStudent, b: CurrentStudent) => {
                            // 定义学位优先级：博士生 > 硕士生 > 本科生
                            const getDegreeOrder = (degree: string) => {
                                switch (degree.toLowerCase()) {
                                    case 'phd':
                                    case 'doctoral':
                                        return 1; // 博士生优先级最高
                                    case 'postgraduate':
                                    case 'master':
                                        return 2; // 硕士生第二
                                    case 'undergraduate':
                                        return 3; // 本科生最后
                                    default:
                                        return 4; // 其他类型排在最后
                                }
                            };
                            
                            const orderA = getDegreeOrder(a.degree);
                            const orderB = getDegreeOrder(b.degree);
                            
                            // 如果学位类型相同，按年份排序（较早的年份在前）
                            if (orderA === orderB) {
                                return a.year.localeCompare(b.year);
                            }
                            
                            return orderA - orderB;
                        })
                        .map((student: CurrentStudent, index: number) => {
                        // 根据学位类型设置不同的颜色主题
                        const getColorTheme = (degree: string) => {
                            switch (degree.toLowerCase()) {
                                case 'undergraduate':
                                    return {
                                        bg: 'bg-yellow-50 dark:bg-yellow-900',
                                        badge: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                                    };
                                case 'postgraduate':
                                    return {
                                        bg: 'bg-blue-50 dark:bg-blue-900',
                                        badge: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                    };
                                case 'phd':
                                case 'doctoral':
                                    return {
                                        bg: 'bg-pink-50 dark:bg-pink-900',
                                        badge: 'bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200'
                                    };
                                default:
                                    return {
                                        bg: 'bg-gray-50 dark:bg-gray-900',
                                        badge: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                                    };
                            }
                        };
                        
                        const colorTheme = getColorTheme(student.degree);
                        
                        return (
                            <div key={index} className={`${colorTheme.bg} p-4 rounded-lg`}>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {student.name}
                                    </h4>
                                    <span className={`text-xs ${colorTheme.badge} px-2 py-1 rounded`}>
                                        {student.degree}
                                    </span>
                                </div>
                                {student.chineseName && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        {student.chineseName}
                                    </p>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    [{student.year}]
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TeamList;
