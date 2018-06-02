package webqq.service;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import webqq.dao.userDao;
import webqq.dao.userGroupDao;
import webqq.entity.User;
import webqq.entity.UserGroup;
import webqq.paramter.Result;
import webqq.util.Uitl;
@Service("userService")
public class userServiceImpl implements userService
{	
	@Resource
	private userDao userdao;
	@Resource
	private userGroupDao usergroupdao;
	/*
	 * 注册用户
	 * @see webqq.service.userService#registerUser(webqq.paramter.userParamter, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public Result<Object> registerUser(String ID,String nickName,String pwd,String autograph) throws Exception
	{
		Result<Object> result=new Result<Object>();
		User u=userdao.queryUserByID(ID);
		
		if(u==null){
			User user=new User();
			user.setAutograph(autograph);
			user.setID(ID);
			user.setNickName(nickName);
			String password=Uitl.getMd5(pwd);
			user.setPassword(password);
			String userId=Uitl.createId();
			user.setUserId(userId);
			userdao.registerUser(user);
			result.setMsg("注册成功");
			result.setState(0);
			//生成三个默认三个分组
			String[] str={"同学","朋友","家人"};
			for(int i=0;i<3;i++){
				String groupId=Uitl.createId();
				UserGroup group=new UserGroup();
				group.setGroupId(groupId);
				group.setUserId(userId);
				group.setGroupName(str[i]);
				usergroupdao.addGroup(group);
			}
			return result;
		}else{
			result.setMsg("已存在用户");
			result.setState(1);
			
			return result;
		}
	
		
	}
	/*
	 * 检查登录
	 * @see webqq.service.userService#checkLogin()
	 */
	public Result<Object> checkLogin(String coder,String pwd,HttpServletRequest req)
	{
		HttpSession session=req.getSession();
		Result<Object> result=new Result<Object>();
		User user=userdao.queryUserByID(coder);
		if(user==null){
			result.setState(1);
			result.setMsg("用户不存在");
			return result;
		}
		try
		{
			//匹配密码
			if(Uitl.getMd5(pwd).equals(user.getPassword())){
				result.setState(0);
				result.setMsg("登录成功");
				result.setData(user);
				session.setAttribute("ID", user.getID());
				session.setAttribute("userId", user.getUserId());
				return result;
			}
		} catch (NoSuchAlgorithmException e)
		{
			
			e.printStackTrace();
		}
		result.setState(2);
		result.setMsg("密码错误");
		return result;
		
	}
	/*
	 * 显示信息
	 * @see webqq.service.userService#showInfo()
	 */
	public Result<User> showInfo(HttpServletRequest req)
	{
		Result<User> result=new Result<User>();
		String Id=(String)req.getSession().getAttribute("ID");
		User user=new User();
		user=userdao.queryUserByID(Id);
		result.setData(user);
		result.setState(0);
		return result;
	}
	//更新信息
	public Result<Object> updateInfo(String nickName, String pwd, String persona, String ID)
	{
		Result<Object> result=new Result<Object>();
		User user=userdao.queryUserByID(ID);
		user.setAutograph(persona);
		user.setNickName(nickName);
		try
		{
			user.setPassword(Uitl.getMd5(pwd));
		} catch (NoSuchAlgorithmException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userdao.updateInfo(user);
		result.setMsg("修改成功");
		result.setState(0);
		return result;
	}
	/*
	 * 搜索用户
	 * @see webqq.service.userService#searchUser(java.lang.String)
	 */
	public Result<List<User>> searchUser(String text)
	{
		Result<List<User>> result=new Result<List<User>>();
		text="%"+text+"%";
		List<User> userList=new ArrayList<User>();
		userList=userdao.searchUser(text);
		result.setData(userList);
		result.setMsg("查找成功");
		result.setState(0);
		return result;
	}
	public Result<User> queryByUserId(String userId)
	{
		Result<User> result=new Result<User>();
		User user=userdao.queryUserByuserId(userId);
		//System.out.println(user);
		result.setData(user);
		result.setState(0);
		result.setMsg("查找信息");
		return result;
	}

}
