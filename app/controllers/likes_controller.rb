class LikesController < ApplicationController
  
  def create
    @like = Like.create(user_id: current_user.id, group_id: params[:group_id], message_id: params[:message_id])
    @group = Group.find(params[:group_id])
    @message = Message.find(params[:message_id])
  end

  def destroy
    like = Like.find_by(user_id: current_user.id, group_id: params[:group_id], message_id: params[:message_id])
    like.destroy
    @group = Group.find(params[:group_id])
    @message = Message.find(params[:message_id])
  end

end
