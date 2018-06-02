package webqq.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import webqq.dao.userGroupDao;
import webqq.entity.User;
import webqq.entity.UserGroup;
import webqq.paramter.Result;
import webqq.util.Uitl;
@Service("userFriendService")
public class userFriendServiceImpl implements userFriendService
{
	@Resource
	private userGroupDao usergroupdao;
	public Result<Object> addFriendList(String userId, String friendId)
	{
		Result<Object> result=new Result<Object>();
		UserGroup group=usergroupdao.queryOneGroup(userId);
		
		
		UserGroup userGroup=new UserGroup();
		userGroup.setFriendId(friendId);
		userGroup.setGroupId(Uitl.createId());
		userGroup.setGroupName(group.getGroupName());
		userGroup.setUserId(userId);
		
		
		UserGroup userGroup1=new UserGroup();
		userGroup1.setFriendId(userId);
		userGroup1.setGroupId(Uitl.createId());
		userGroup1.setGroupName(group.getGroupName());
		userGroup1.setUserId(friendId);
		
		usergroupdao.addGroup(userGroup);
		usergroupdao.addGroup(userGroup1);
		
		result.setMsg("添加好成功");
		result.setState(0);
		return result;
	}
	/*
	 * (获取好友列表
	 * @see webqq.service.userFriendService#getFriendList(javax.servlet.http.HttpServletRequest)
	 */
	public Result<List<User>> getFriendList(HttpServletRequest req)
	{
		Result<List<User>> result=new Result<List<User>>();
		HttpSession session=req.getSession();
		String userId=(String)session.getAttribute("userId");
		//System.out.println(userId);
		List<User> list=new ArrayList<User>();
		list=usergroupdao.getFriendList(userId);
		//System.out.println(list);
		result.setData(list);
		result.setMsg("获取成功");
		result.setState(0);
		return result;
	}

}
