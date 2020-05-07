class LikesController < ApplicationController
  before_action :set_group
  before_action :set_message
  
  def create
    @like = Like.create(user_id: current_user.id, group_id: params[:group_id], message_id: params[:message_id])
  end

  def destroy
    like = Like.find_by(user_id: current_user.id, group_id: params[:group_id], message_id: params[:message_id])
    like.destroy
  end

  
  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_message
    @message = Message.find(params[:message_id])
  end

end
