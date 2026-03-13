import Image from 'next/image';

import ExtLink from './ExtLink';
import ProfileImage from './ProfileImage';
import personalInfo from './data/personalInfo.json'
import { Italic } from 'react-feather';

const About = (): JSX.Element => {
	return (
		<section className="grid gap-12 scroll-mt-24" id="about">
			<div className="flex justify-between items-start">
				<div className="mr-8 hidden md:block rounded-md flex-shrink-0">
					<div className="h-full flex items-center">
						<ProfileImage></ProfileImage>
					</div>
				</div>
				<div className="flex flex-col max-w-xl w-full justify-start space-y-4 min-h-[300px]">
					<h1 className="text-4xl font-bold pb-2 md:pb-0">{personalInfo.name}</h1>
					<p className="mt-2">
					Associate Professor and Master's Supervisor
					of <ExtLink href="https://scce.ustb.edu.cn/">SCCE </ExtLink>
					, <ExtLink href="https://www.ustb.edu.cn/">USTB </ExtLink>.
					<br/>✉️<a className = "text-base font-serif text-gray-600 dark:invert"> {personalInfo.about.email}</a>	
					</p>
					
					<p className="text-base italic mt-4">
					My current research interests include medical semantic understanding and multi-modal 3D reconstruction. Recently, I have authored over 20 papers in journals and at international conferences and is now in charge of National Natural Science Foundation of China, Research on Chronic Disease Management, China Postdoctoral Science Foundation, and Open Fund of the Key Laboratory of the Ministry of Education. I was awarded Stanford-Elsevier World's Top 2% Scientists List and Beijing Young Talent Support Project.
					</p>
					<p className="text-base mt-4">
					陈诚，北京科技大学计算机与通信工程学院，副教授，硕士生导师；长期致力于图像语义理解、多模态三维重建等。主持国家自然科学基金、慢病管理研究课题、中国博士后科学基金、教育部重点实验室开放基金等项目。近3年，研究成果以第一/通讯作者发表SCI论文/CCF A类会议20余篇，独著著作1部。入选斯坦福-爱思唯尔全球前2%顶尖科学家榜单、北京市青年人才托举工程等。
					</p>
					{/* <p className = "text-sm text-gray-600">
						Research Interest: {personalInfo.about.interest}
					</p>
					<p className = "text-sm text-gray-400">
						Under construction......<br/>
						Re-architecting this site with some modern web technologies.
					</p> */}
				</div>
			</div>
			<div>
			<p className="text-blue-600 font-bold text-xl mb-2">
			Internship and Graduate Students Opening: 
			</p>
			<p>
			
			We warmly welcome all students to apply for graduate studies and encourage undergraduate students to join our research team in advance to achieve early results!
			</p>
			<p>
			欢迎广大学子报考研究生，也欢迎本科生提前进组，早出成果！
			</p>
			
			</div>
		</section>
	);
};

export default About;
