import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import webqq.dao.userDao;
import webqq.entity.User;

public class testUser
{
	private ApplicationContext ac;
	@Before
	public void init(){
		ac=new ClassPathXmlApplicationContext("conf/spring-mybatis.xml");
	}
	@Test
	public void registerUserTest(){
		userDao dao=ac.getBean("userDao",userDao.class);
//		String userId="264681416";
//		String ID="153513";
//		String nickName="Engine";
//		String password="1365153";
//		String autograph="cniuksan";
//		User user=new User();
//		user.setAutograph(autograph);
//		user.setID(ID);
//		user.setNickName(nickName);
//		user.setPassword(password);
//		user.setUserId(userId);
//		dao.registerUser(user);
		User list=dao.queryUserByuserId("c1e5cdb40b344c0ca1b6e19f2c853e70");
		User u=dao.queryUserByID("111111");
		System.out.println(list);
	}
}
