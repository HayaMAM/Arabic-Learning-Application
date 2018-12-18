require 'test_helper'

class WordControllerTest < ActionDispatch::IntegrationTest
  test "should get s" do
    get word_s_url
    assert_response :success
  end

  test "should get index" do
    get word_index_url
    assert_response :success
  end

  test "should get show" do
    get word_show_url
    assert_response :success
  end

  test "should get new" do
    get word_new_url
    assert_response :success
  end

  test "should get create" do
    get word_create_url
    assert_response :success
  end

  test "should get destroy" do
    get word_destroy_url
    assert_response :success
  end

end
