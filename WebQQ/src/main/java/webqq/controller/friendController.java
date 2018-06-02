package webqq.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import webqq.entity.User;
import webqq.paramter.Result;
import webqq.service.userFriendService;

@Controller
@RequestMapping("/friend")
public class friendController
{
	@Resource
	private userFriendService userFriendService;
	@RequestMapping("/addfriendlist.do")
	@ResponseBody
	public Result<Object> executeAddFriendList(String userId,String friendId){
		Result<Object> result=new Result<Object>();
	//	System.out.println(userId+" "+friendId);
		System.out.println("lllsss");
		result=userFriendService.addFriendList(userId, friendId);
		System.out.println(result);
		return result;
	}
	@RequestMapping("/getFriendList.do")
	@ResponseBody
	public Result<List<User>> executeGetFriendList(HttpServletRequest req){
		Result<List<User>> result=new Result<List<User>>();
		result=userFriendService.getFriendList(req);
		return result;
	}
}
