package webqq.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import webqq.entity.User;
import webqq.paramter.Result;

public interface userFriendService
{
	//添加好友列表
	public Result<Object> addFriendList(String userId,String friendId);
	//获取好友列表
	public Result<List<User>> getFriendList(HttpServletRequest req);
}
