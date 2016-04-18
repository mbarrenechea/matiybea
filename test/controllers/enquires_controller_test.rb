require 'test_helper'

class EnquiresControllerTest < ActionController::TestCase
  setup do
    @enquire = enquires(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enquires)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enquire" do
    assert_difference('Enquire.count') do
      post :create, enquire: { name: @enquire.name, score: @enquire.score }
    end

    assert_redirected_to enquire_path(assigns(:enquire))
  end

  test "should show enquire" do
    get :show, id: @enquire
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @enquire
    assert_response :success
  end

  test "should update enquire" do
    patch :update, id: @enquire, enquire: { name: @enquire.name, score: @enquire.score }
    assert_redirected_to enquire_path(assigns(:enquire))
  end

  test "should destroy enquire" do
    assert_difference('Enquire.count', -1) do
      delete :destroy, id: @enquire
    end

    assert_redirected_to enquires_path
  end
end
